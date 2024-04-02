class Api::V1::CharactersController < ApplicationController
  def index
    character = Character.all.order(created_at: :desc)
    render json: character
  end

  def something
    result = Character.boxCreation(characters_params)
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
    if Character.gameEnds
      result[:gameEnd] = true
      result[:score] = Character.calculateScore
      Level.first.update!(score: result[:score])
      result[:highscore] = Character.isHighScore(result[:score])
      Character.resetGame
    end
    render json: result
  end

  def characters_params
    params.require(:xyzguess).permit(:x, :y, :character)
  end
end
