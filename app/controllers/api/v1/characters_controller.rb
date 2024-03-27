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

  private def boxCreation(result) # need to do validation there.
    x = result[1].to_i
    y = result[2].to_i
    characters = Level.all.order(created_at: :desc).find_by(id: result[0].to_i).characters
    answer = { answer: "no" }
    characters.each do |char|
      x1 = char.pixel_location["x"]
      y1 = char.pixel_location["y"]
      x2 = x1 + 64
      y2 = y1 + 120

      if x.between?(x1, x2) && y.between?(y1, y2) && result[3] == char.name
        answer = { answer: "yes", characterName: char.name }
        char.found = true
      end
    end
    answer
  end
end
