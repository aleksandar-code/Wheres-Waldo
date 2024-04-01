class CreateLevels < ActiveRecord::Migration[7.1]
  def change
    create_table :levels do |t|
      t.string :image
      t.integer :timer
      t.integer :score
      t.integer :characters_number

      t.timestamps
    end
  end
end
