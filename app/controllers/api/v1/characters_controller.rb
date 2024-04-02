class Api::V1::CharactersController < ApplicationController
  def index
    character = Character.all.order(created_at: :desc)
    render json: character
  end

  def something
    result = boxCreation(characters_params)
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
    if gameEnds
      result[:gameEnd] = true
      result[:score] = calculateScore
      Level.first.update!(score: result[:score])
      result[:highscore] = isHighScore(result[:score])
      resetGame
    end
    render json: result
  end

  private

  def boxCreation(result) # need to do validation there.
    x = result["x"].to_i
    y = result["y"].to_i
    characters = Level.all.order(created_at: :desc).first.characters
    answer = { answer: "no", gameEnd: false }
    characters.each do |char|
      x1 = char.pixel_location["x"]
      y1 = char.pixel_location["y"]
      x2 = x1 + 64
      y2 = y1 + 120

      if x.between?(x1, x2) && y.between?(y1, y2) && result["character"] == char.name
        answer = { answer: "yes", characterName: char.name, gameEnd: false }
        char.found = true
        char.save
        char.reload
      end
    end
    answer
  end

  def resetGame
    characters = Character.all.order(created_at: :desc)
    characters.each do |char|
      char.found = false
      char.save
      char.reload
    end
    Level.first.update!(timer: 0)
  end

  def gameEnds
    characters = Character.all.order(created_at: :desc)
    array = []
    characters.each do |char|
      array.push(char.found)
    end
    return true if array.uniq!.size == 1 && array[0] == true
    false
  end

  def calculateScore
    score = (1000 - (Time.now.to_i - Level.first.timer)) * 2.2

    return 100 if score < 100
    return score.round()
  end

  def isHighScore(score)
    leaderboard = Leaderboard.limit(5).order(score: :desc)
    if leaderboard.length < 5
      true
    else
      score >= leaderboard[4].score
    end
  end

  def characters_params
    params.require(:xyzguess).permit(:x, :y, :character)
  end
end
