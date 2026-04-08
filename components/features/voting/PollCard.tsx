'use client';

import { useState } from 'react';
import { Vote, Clock, Users, CheckCircle, ChevronUp } from 'lucide-react';
import { Poll } from '@/types';
import { cn, formatShortDate, getTimeRemaining, calculateVotePercentage } from '@/lib/utils';

interface PollCardProps {
  poll: Poll;
  showFullResults?: boolean;
}

export default function PollCard({ poll, showFullResults = false }: PollCardProps) {
  const [voted, setVoted] = useState(poll.userVotedOptions.length > 0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localPoll, setLocalPoll] = useState(poll);
  const [animate, setAnimate] = useState(false);

  const handleVote = () => {
    if (!selectedOption || voted) return;
    
    setLocalPoll(prev => ({
      ...prev,
      options: prev.options.map(opt => 
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      ),
      totalVotes: prev.totalVotes + 1,
      userVotedOptions: [selectedOption],
    }));
    setVoted(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const getWinningOption = () => {
    return localPoll.options.reduce((max, opt) => opt.votes > max.votes ? opt : max, localPoll.options[0]);
  };

  const isExpired = new Date(localPoll.deadline) < new Date();

  return (
    <article className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Vote className="w-4 h-4 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{localPoll.createdByName}</p>
            <p className="text-xs text-text-secondary">{formatShortDate(localPoll.createdAt)}</p>
          </div>
        </div>
        {localPoll.isActive && !isExpired ? (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success rounded-full text-xs">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            {getTimeRemaining(localPoll.deadline)} tersisa
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-text-secondary/10 text-text-secondary rounded-full text-xs">
            <Clock className="w-3 h-3" />
            Berakhir
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2">{localPoll.question}</h3>
      {localPoll.description && (
        <p className="text-sm text-text-secondary mb-4">{localPoll.description}</p>
      )}

      <div className="space-y-3 mb-6">
        {localPoll.options.map((option) => {
          const percentage = calculateVotePercentage(option.votes, localPoll.totalVotes);
          const isWinning = option.id === getWinningOption().id;
          const isUserVote = localPoll.userVotedOptions.includes(option.id);

          return (
            <div
              key={option.id}
              onClick={() => !voted && !isExpired && setSelectedOption(option.id)}
              className={cn(
                'relative rounded-xl p-4 cursor-pointer transition-all overflow-hidden',
                selectedOption === option.id && !voted
                  ? 'bg-accent/20 border-2 border-accent'
                  : voted || isExpired
                  ? 'bg-surface'
                  : 'bg-surface hover:bg-surface/80',
                !voted && !isExpired && 'border-2 border-transparent'
              )}
            >
              <div className="relative z-10 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary">{option.text}</span>
                  {isUserVote && (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  )}
                  {isWinning && (voted || isExpired) && (
                    <ChevronUp className="w-4 h-4 text-accent" />
                  )}
                </div>
                {(voted || isExpired) && (
                  <span className="font-mono font-semibold text-text-primary">{percentage}%</span>
                )}
              </div>

              {(voted || isExpired) && (
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 rounded-full transition-all duration-500',
                      animate && 'animate-shimmer',
                      isUserVote ? 'bg-accent' : isWinning ? 'bg-primary' : 'bg-text-secondary/30'
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}

              {(voted || isExpired) && (
                <p className="relative z-10 text-xs text-text-secondary mt-1">
                  {option.votes} suara
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <Users className="w-4 h-4" />
          <span>{localPoll.totalVotes} suara</span>
        </div>

        {!voted && !isExpired && (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className={cn(
              'btn text-sm px-4 py-2',
              selectedOption ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'
            )}
          >
            Vote
          </button>
        )}

        {voted && (
          <button className="text-sm text-accent hover:underline">
            Ubah pilihan
          </button>
        )}
      </div>
    </article>
  );
}
