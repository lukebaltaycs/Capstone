class Article < ApplicationRecord
  belongs_to :issue
  belongs_to :publication, through: :issue
end
