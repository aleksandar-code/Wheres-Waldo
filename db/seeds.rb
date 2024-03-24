# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

level = Level.create!(image:"images/Where-is-waldo-1.png", timer: 180, score: 0, found: 0, characters_number: 3)

character1 = Character.create!(name: "Waldo", found: false, pixel_location: 660, level_id: 1)
character2 = Character.create!(name: "Wizard", found: false, pixel_location: 828, level_id: 1)
character3 = Character.create!(name: "Odlaw", found: false, pixel_location: 187, level_id: 1)
