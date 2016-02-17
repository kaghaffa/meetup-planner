class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :token, null: false

      t.integer :event_type_id
      t.integer :user_id

      t.string :host
      t.string :guest_list

      t.datetime :starts
      t.datetime :ends

      t.string :location
      t.string :latitude
      t.string :longitude

      t.text :description

      t.timestamps
    end

    add_index :events, :token, unique: true
  end
end
