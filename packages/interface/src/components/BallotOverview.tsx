import Link from "next/link";
import { useMemo } from "react";

import { Heading } from "~/components/ui/Heading";
import { useBallot } from "~/contexts/Ballot";
import { useRoundState } from "~/utils/state";
import { ERoundState } from "~/utils/types";

import { AddedProjects } from "./AddedProjects";
import { VotingUsage } from "./VotingUsage";

interface IBallotOverviewProps {
  roundId: string;
  title?: string;
  pollId: string;
}

export const BallotOverview = ({ title = undefined, roundId, pollId }: IBallotOverviewProps): JSX.Element => {
  const { getBallot } = useBallot();

  const ballot = useMemo(() => getBallot(pollId), [pollId, getBallot]);

  const roundState = useRoundState(roundId);

  return (
    <Link
      href={
        ballot.published && (roundState === ERoundState.TALLYING || roundState === ERoundState.RESULTS)
          ? `/rounds/${roundId}/ballot/confirmation`
          : `/rounds/${roundId}/ballot`
      }
    >
      <div className="dark:bg-lightBlack my-8 flex-col items-center gap-2 rounded-lg bg-white p-5 uppercase shadow-lg dark:text-white">
        <Heading as="h3" size="3xl">
          {title}
        </Heading>

        <AddedProjects roundId={roundId} />

        <VotingUsage pollId={pollId} />
      </div>
    </Link>
  );
};
