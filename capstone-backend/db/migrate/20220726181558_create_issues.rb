class CreateIssues < ActiveRecord::Migration[7.0]
  def change
    create_table :issues do |t|
      t.string :name
      t.integer :number
      t.references :publication, null: false, foreign_key: true

      t.timestamps
    end
  end
end
