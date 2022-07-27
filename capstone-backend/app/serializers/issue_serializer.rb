class IssueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :number
  belongs_to :publication
  has_many :articles
end