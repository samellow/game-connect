export const shuffleFixtures = ( fixtures) => {
    let currentIndex = fixtures.length;
    let randomIndex;

    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [fixtures[currentIndex], fixtures[randomIndex]] = [fixtures[randomIndex], fixtures[currentIndex]];
    }

    return fixtures
}