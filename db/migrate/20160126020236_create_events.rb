class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.integer :event_type_id
      t.integer :user_id

      t.string :host
      t.string :guest_list

      t.datetime :start_time
      t.datetime :end_time

      t.string :location
      t.string :latitude
      t.string :longitude

      t.string :description

      t.timestamps
    end
  end
end
