interface BreakPoints {
	mobile: string;
	mobileLandscape: string;
	tablet: string;
	tabletLandscape: string;
	laptop: string;
}
// 해상도 break point는 https://gs.statcounter.com/screen-resolution-stats/ 참조하였음.
const breakPoints: BreakPoints = {
	mobile: '414px', // 414x736
	mobileLandscape: '640px', // 640x360(360x640)
	tablet: '810px', // 810x1080
	tabletLandscape: '1280px', // 1280x800(800x1280)
	laptop: '1536px' // 1536x864
};

export default breakPoints;
