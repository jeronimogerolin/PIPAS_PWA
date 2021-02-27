import { createSelector } from 'reselect';
import moment from 'moment';
import { useSelector } from 'react-redux';

const parameterAgeSelector = () => {
  const interview = useSelector((state) => state.interview);

  return createSelector(
    (state) => state.block,
    (blocks) =>
      blocks.filter(
        (b) =>
          !b.parameterAge ||
          b.parameterAge.includes(
            Number(moment().diff(interview.childBirthDate, 'months'))
          )
      )
  );
};

export default parameterAgeSelector;
