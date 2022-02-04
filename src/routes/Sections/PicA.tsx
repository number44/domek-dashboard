interface PropsI {
	imgUrl: string;
}
const PicA = ({ imgUrl }: PropsI) => {
	return <img className="objec object-cover h-full w-full" src={imgUrl} alt="" />;
};

export default PicA;
