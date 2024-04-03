class Api::V1::LevelsController < ApplicationController
  def index
    level = Level.all.order(created_at: :desc)
    characters = Level.filter_characters
    Leaderboard.start_timer
    render json: [level, characters]
  end
end
