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
end
