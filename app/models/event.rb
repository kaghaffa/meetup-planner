class Event < ActiveRecord::Base
  has_one :user

  before_create :_set_token

  class << self
    def _generate_token
      token = SecureRandom.hex(4)

      token.tap do |t|
        loop {
          break if self.find_by_token(t).nil?
          t = SecureRandom.hex(4)
        }
      end
    end
  end # Class Methods

  private

  def _set_token
    self.token = self.class._generate_token
  end
end
