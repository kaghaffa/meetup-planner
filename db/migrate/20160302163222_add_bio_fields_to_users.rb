class AddBioFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :job_title, :string
    add_column :users, :employer, :string
  end
end
