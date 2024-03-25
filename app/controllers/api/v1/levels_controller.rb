class Api::V1::LevelsController < ApplicationController
  def index
    level = Level.all.order(created_at: :desc)
    characters = Level.all.order(created_at: :desc).first.characters
    render json: [level, characters]
  end
end
