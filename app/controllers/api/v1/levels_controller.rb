class Api::V1::LevelsController < ApplicationController
  TOKEN = ENV["API_KEY"]

  before_action :authenticate

  def index
    level = Level.all.order(created_at: :desc)
    characters = Level.all.order(created_at: :desc).first.characters
    render json: [level, characters]
  end

  private
    def authenticate
      authenticate_or_request_with_http_token do |token, options|
        ActiveSupport::SecurityUtils.secure_compare(token, TOKEN)
      end
    end
end
