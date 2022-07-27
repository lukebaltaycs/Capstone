class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :content, :file
  belongs_to :issue
  belongs_to :publication, through: :issue
end
