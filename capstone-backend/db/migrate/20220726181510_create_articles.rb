class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :name
      t.text :content
      t.string :file
      t.references :issue, null: false, foreign_key: true

      t.timestamps
    end
  end
end
