class RemoveEventTypes < ActiveRecord::Migration
  def change
    drop_table :event_types

    remove_column :events, :event_type_id
    add_column :events, :event_type, :string
  end
end
