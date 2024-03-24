class CreateLevels < ActiveRecord::Migration[7.1]
  def change
    create_table :levels do |t|
      t.string :image
      t.integer :timer
      t.integer :score
      t.integer :found
      t.integer :characters

      t.timestamps
    end
  end
end
