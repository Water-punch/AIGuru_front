// import React from 'react';
// import { CommentsProps } from '../../types/CommentTypes';

// interface CommentAnalysisProps {
//   commentsProps: CommentsProps;
// }

// const CommentAnalysis: React.FC<CommentAnalysisProps> = ({ commentsProps }) => {
//   const { positiveCount, negativeCount } = commentsProps;

//   const analyzeComments = () => {
//     // positive와 negative의 비율 계산
//     const totalComments = positiveCount + negativeCount;
//     const positivePercentage = (positiveCount / totalComments) * 100;
//     const negativePercentage = (negativeCount / totalComments) * 100;

//     return {
//       positivePercentage,
//       negativePercentage,
//     };
//   };

//   const renderImages = () => {
//     const { positivePercentage, negativePercentage } = analyzeComments();

//     return (
//       <div className="flex items-center">
//         {/* Smile 이미지 */}
//         <img
//           src="/smile.png"
//           alt="smile"
//           className="mr-2"
//           style={{ width: `${positivePercentage}%` }}
//         />

//         {/* Angry 이미지 */}
//         <img
//           src="/angry.png"
//           alt="angry"
//           style={{ width: `${negativePercentage}%` }}
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold mb-2">Comment Analysis</h3>
//       {renderImages()}
//     </div>
//   );
// };

// export default CommentAnalysis;
