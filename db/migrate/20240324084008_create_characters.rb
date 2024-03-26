class CreateCharacters < ActiveRecord::Migration[7.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.boolean :found
      t.json :pixel_location

      t.timestamps
    end
  end
end
