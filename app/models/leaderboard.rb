class Leaderboard < ApplicationRecord

  def self.start_timer
    if Level.first.timer == 0
      Level.first.update!(timer: Time.now.to_i)
    end
  end

  def self.stop_timer
    Level.first.update!(timer: 0)
  end

  def self.calculate_score
    score = (1000 - (Time.now.to_i - Level.first.timer)) * 2.2

    return 100 if score < 100
    return score.round()
  end

  def self.high_score?(score)
    leaderboard = Leaderboard.limit(5).order(score: :desc)
    if leaderboard.length < 5
      true
    else
      score >= leaderboard[4].score
    end
  end
end
