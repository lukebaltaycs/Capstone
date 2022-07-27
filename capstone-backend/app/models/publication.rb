class Publication < ApplicationRecord
    has_many :issues
    has_many :articles, through: :issues
end
