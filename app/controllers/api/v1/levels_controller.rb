class Api::V1::LevelsController < ApplicationController
  TOKEN = ENV["API_KEY"]

  before_action :authenticate

  def index
    level = Level.all.order(created_at: :desc)
    characters = []
    chars_array = Level.all.order(created_at: :desc).first.characters
    chars_array.each do |character|
      characters.push({name: character.name, id: character.id, found: character.found})
    end
    render json: [level, characters]
  end

  private
    def authenticate
      authenticate_or_request_with_http_token do |token, options|
        ActiveSupport::SecurityUtils.secure_compare(token, TOKEN)
      end
    end
end
