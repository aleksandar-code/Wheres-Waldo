class Api::V1::LeaderboardController < ApplicationController
  def index
    leaderboard = Leaderboard.limit(5).order(score: :desc)
    render json: leaderboard
  end

  def create
    leaderboard = Leaderboard.new(username: leaderboard_params[:username], score: Level.first.score)
    Level.first.update!(score: 0)
    if leaderboard.save
      flash[:notice] = "You have successfully joined the leaderboards."
      redirect_to leaderboard_path
    else
      flash[:notice] = "Error, you haven't joined leaderboards."
      redirect_to leaderboard_path
    end
  end

  def leaderboard_params
    params.require(:leaderboard).permit(:username)
  end
end
