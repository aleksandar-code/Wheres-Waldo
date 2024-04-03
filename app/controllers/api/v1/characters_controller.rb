class Api::V1::CharactersController < ApplicationController
  def index
    character = Character.all.order(created_at: :desc)
    render json: character
  end

  def guess_output
    response = Character.boxCreation(characters_params)
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
    if Character.gameEnds
      response[:gameEnd] = true
      response[:score] = Character.calculateScore
      Level.first.update!(score: response[:score])
      response[:highscore] = Character.isHighScore(response[:score])
      Character.resetGame
    end
    render json: response
  end

  def characters_params
    params.require(:xyzguess).permit(:x, :y, :character)
  end
end
