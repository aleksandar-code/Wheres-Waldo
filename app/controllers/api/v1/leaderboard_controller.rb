class LeaderboardController < ApplicationController
  def index
    leaderboard = Leaderboard.all.order(created_at: :desc)
    render json: leaderboard
  end

  def create
    result = params[:params].split(" ")
  end
end
