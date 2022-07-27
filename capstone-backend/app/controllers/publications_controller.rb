class PublicationsController < ApplicationController

    def index
        publications = Publication.all

        options = {
            include: [:issues, :articles]
        }

        render json: PublicationSerializer.new(publications, options)
    end

    def create
        render :index
    end

end
