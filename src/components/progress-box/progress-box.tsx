import React from 'react';
import {
    ProgressBarWrapper,
    ProgressStep,
    ProgressBar,
    StatusTitle,
    StatusBox,
    StatusDetails,
    CheckMarkWrapper,
} from './progress-box.style';
import { CheckMark } from 'assets/icons/CheckMark';

type ProgressProps = {
    status?: any;
};


const progressData = [
    { status: 'PENDING', title: 'Pending' },
    { status: 'PROCESSING', title: 'In Process' },
    { status: 'COMPLETED', title: 'Completed' },
];

const ProgressBox: React.FC<ProgressProps> = ({ status }) => {

    const currentIndex = progressData.findIndex(e => e.status === status);

    return (
        <>
            {progressData.map((item, index) => (
                <ProgressStep key={index}>
                    <ProgressBarWrapper className={currentIndex >= index ? 'checked' : ''}>
                        <StatusBox>
                            {status >= index + 1 ? (
                                <CheckMarkWrapper>
                                    <CheckMark/>
                                </CheckMarkWrapper>
                            ) : (
                                index + 1
                            )}
                        </StatusBox>
                        <ProgressBar/>
                    </ProgressBarWrapper>
                    <StatusDetails>
                        {item ? <StatusTitle>{item.title}</StatusTitle> : ''}
                    </StatusDetails>
                </ProgressStep>
            ))}
        </>
    );
};

export default ProgressBox;
