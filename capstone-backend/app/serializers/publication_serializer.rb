class PublicationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  has_many :issues
end
