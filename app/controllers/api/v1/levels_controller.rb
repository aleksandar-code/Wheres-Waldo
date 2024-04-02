class Api::V1::LevelsController < ApplicationController
  def index
    level = Level.all.order(created_at: :desc)
    characters = []
    chars_array = Level.all.order(created_at: :desc).first.characters
    chars_array.each do |character|
      characters.push({name: character.name, id: character.id, found: character.found})
    end
    render json: [level, characters]
  end
end
