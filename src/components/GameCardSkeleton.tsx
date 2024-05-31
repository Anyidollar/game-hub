import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="150px" width="300%" />
      <CardBody>
        <SkeletonText mt={4} noOfLines={1} spacing={4} />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
