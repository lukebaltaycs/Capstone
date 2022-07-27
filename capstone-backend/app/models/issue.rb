class Issue < ApplicationRecord
  belongs_to :publication
  has_many :articles
end
