/* feedreader.js
 *
 * This is the spec file that Jasmine will read
 */

$(() => {

    describe('RSS Feeds', () => {

        // Check if feeds are defined and not empty
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Check if URLs in feeds are defined and not empty
        it('URL are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Check if names are defined and not empty
        it('name are defined', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', () => {

        // Check if body has .menu-hidden to hide side menu
        it('is hidden by default', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Check if body toggles .menu-hidden to hide and show side menu
        it('toggles on click', () => {
            const menuIcon = $('.menu-icon-link');
            menuIcon.click() // Simulate click to show
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click() // Simulate click to hide
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
         
    describe('Initial Entries', () => {

        // Check that the first feed is loaded before test
        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });

        // Check initial entries to be not empty
        it('has at least one entry', () => {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    // Check new feeds are selected when the loadFeed is called
    describe('New Feed Selection', () => {
        let feed1,
            feed2;

        // Check loadFeed is successfully called twice before test
        beforeEach((done) => {
            loadFeed(0, () => {
                feed1 = $('.entry-link').html();
                loadFeed(1, () => {
                    feed2 = $('.entry-link').html();
                    done();
                })
            });
        });

        // Check feed1, feed 2 are indeed different after loadFeed runs again
        it('changes when new content is loaded', () => {
            expect(feed1 !== feed2).toBe(true);
        })
    });
});