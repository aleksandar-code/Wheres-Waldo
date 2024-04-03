class Level < ApplicationRecord
  has_many :characters

  def self.filter_characters
    characters = []
    chars_array = Level.all.order(created_at: :desc).first.characters
    chars_array.each do |character|
      characters.push({name: character.name, id: character.id, found: character.found})
    end
    characters
  end
end
