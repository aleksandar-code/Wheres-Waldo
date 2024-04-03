class Character < ApplicationRecord
  belongs_to :level

  def self.process_guess(characters_params)
    response = self.targeting_box?(characters_params)
    if Level.game_end?
      Level.end_operations(response)
    else
      response
    end
  end

  def self.verify_coordinates(x, y, character, answer)
    characters = Level.all.order(created_at: :desc).first.characters
    characters.each do |char|
      x1 = char.pixel_location["x"]
      y1 = char.pixel_location["y"]
      x2 = x1 + 64
      y2 = y1 + 120

      if x.between?(x1, x2) && y.between?(y1, y2) && character == char.name
        answer = { answer: "yes", characterName: char.name, gameEnd: false }
        char.update!(found: true)
      end
    end
    answer
  end

  def self.targeting_box?(response)
    x = response["x"].to_i
    y = response["y"].to_i
    answer = { answer: "no", gameEnd: false }
    self.verify_coordinates(x, y, response["character"], answer)
  end
end
