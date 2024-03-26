class Api::V1::CharactersController < ApplicationController
  def index
    character = Character.all.order(created_at: :desc)
    render json: character
  end

  def something
    result = params[:params].split(" ")
    result = boxCreation(result)
    render json: result
  end

  private def boxCreation(result)
    x = result[1].to_i
    y = result[2].to_i
    a = 1
    b = 800
    if x.between?(a, b) && y.between?(a, b)
      return 1
    else
      return 0
    end
  end

end
