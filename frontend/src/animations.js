const repeatTransition = {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 1,
    repeatType: "reverse"
};

const idleTransition = {
    ...repeatTransition,
    duration: 1.5,
    ease: "circIn",
    repeatDelay: 0.1,
    bounceDamping: 10
};

export const bobAnimation = {
    typing: {
        x: ['-5%', '5%'],
        y: ['15%'],
        transition: repeatTransition
    },
    idle: {
        y: ['-25%', '25%'],
        transition: idleTransition
    }
};

export const innerCircleAnimation = {
    typing: {
        x: ['-6%', '12%'],
        y: ['10%'],
        transition: repeatTransition
    },
    idle: {
        y: ['-5%', '5%'],
        transition: idleTransition
    }
};
