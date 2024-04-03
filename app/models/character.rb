class Character < ApplicationRecord
  belongs_to :level

  def self.process_guess(characters_params)
    response = self.targeting_box?(characters_params)
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
    if self.game_end?
      self.end_operations(response)
    else
      response
    end
  end

  def self.targeting_box?(response)
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

  def self.reset_game
    characters = Character.all.order(created_at: :desc)
    characters.each do |char|
      char.update!(found: false)
    end
    Level.first.update!(timer: 0)
    Level.first.update!(score: 0)
  end

  def self.game_end?
    characters = Character.all.order(created_at: :desc)
    array = []
    characters.each do |char|
      array.push(char.found)
    end
    return true if array.uniq!.size == 1 && array[0] == true
    false
  end

  def self.calculate_score
    score = (1000 - (Time.now.to_i - Level.first.timer)) * 2.2

    return 100 if score < 100
    return score.round()
  end

  def self.high_score?(score)
    leaderboard = Leaderboard.limit(5).order(score: :desc)
    if leaderboard.length < 5
      true
    else
      score >= leaderboard[4].score
    end
  end

  def self.build_response(response)
    response[:gameEnd] = true
    response[:score] = self.calculate_score
    Level.first.update!(score: response[:score])
    response[:highscore] = self.high_score?(response[:score])
    response
  end

  def self.end_operations(response)
    response = self.build_response(response)
    self.reset_game
    response
  end
end
