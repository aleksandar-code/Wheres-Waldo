class Api::V1::CharactersController < ApplicationController
  def index
    character = Character.all.order(created_at: :desc)
    render json: character
  end

  def guess_output
    response = Character.process_guess(characters_params)
    render json: response
  end

  def characters_params
    params.require(:xyzguess).permit(:x, :y, :character)
  end
end
