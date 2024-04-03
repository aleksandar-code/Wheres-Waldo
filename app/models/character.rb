class Character < ApplicationRecord
  belongs_to :level

  def self.process_guess(characters_params)
    response = self.boxCreation(characters_params)
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
    if self.gameEnds
      response[:gameEnd] = true
      response[:score] = self.calculateScore
      Level.first.update!(score: response[:score])
      response[:highscore] = self.isHighScore(response[:score])
      self.resetGame
    end
    response
  end

  def self.boxCreation(response) # need to do validation there.
    x = response["x"].to_i
    y = response["y"].to_i
    characters = Level.all.order(created_at: :desc).first.characters
    answer = { answer: "no", gameEnd: false }
    characters.each do |char|
      x1 = char.pixel_location["x"]
      y1 = char.pixel_location["y"]
      x2 = x1 + 64
      y2 = y1 + 120

      if x.between?(x1, x2) && y.between?(y1, y2) && response["character"] == char.name
        answer = { answer: "yes", characterName: char.name, gameEnd: false }
        char.update!(found: true)
      end
    end
    answer
  end

  def self.resetGame
    characters = Character.all.order(created_at: :desc)
    characters.each do |char|
      char.update!(found: false)
    end
    Level.first.update!(timer: 0)
    Level.first.update!(score: 0)
  end

  def self.gameEnds
    characters = Character.all.order(created_at: :desc)
    array = []
    characters.each do |char|
      array.push(char.found)
    end
    return true if array.uniq!.size == 1 && array[0] == true
    false
  end

  def self.calculateScore
    score = (1000 - (Time.now.to_i - Level.first.timer)) * 2.2

    return 100 if score < 100
    return score.round()
  end

  def self.isHighScore(score)
    leaderboard = Leaderboard.limit(5).order(score: :desc)
    if leaderboard.length < 5
      true
    else
      score >= leaderboard[4].score
    end
  end
end
