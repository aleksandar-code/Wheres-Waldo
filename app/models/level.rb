class Level < ApplicationRecord
  has_many :characters

  def self.filter_characters
    characters_array = []
    array = Level.all.order(created_at: :desc).first.characters
    array.each do |character|
      characters_array.push({name: character.name, id: character.id, found: character.found})
    end
    characters_array
  end

  def self.reset_game
    characters = Character.all.order(created_at: :desc)
    characters.each do |char|
      char.update!(found: false)
    end
  end

  def self.game_end?
    characters = Character.all.order(created_at: :desc)
    array = []
    characters.each do |char|
      array.push(char.found)
    end
    return true if array.uniq!.size == 1 && array[0] == true
    false
  end

  def self.build_response(response)
    response[:gameEnd] = true
    response[:score] = Leaderboard.calculate_score
    Level.first.update!(score: response[:score])
    response[:highscore] = Leaderboard.high_score?(response[:score])
    response
  end

  def self.end_operations(response)
    response = self.build_response(response)
    Level.reset_game
    Leaderboard.stop_timer
    response
  end
end
