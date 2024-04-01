class Api::V1::LeaderboardController < ApplicationController
  def index
    leaderboard = Leaderboard.all.order(created_at: :desc)
    render json: leaderboard
  end

  def create
    leaderboard = Leaderboard.new(username: params[:username], score: Level.first.score)

    if leaderboard.save
      render json: leaderboard, status: :created
    else
      render json: leaderboard.errors, status: :unproccessable_entity
    end
  end
end
