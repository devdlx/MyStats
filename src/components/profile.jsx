import { Component, render } from "preact";

// ========================================
// Profile
// ========================================
import Card from "preact-material-components/Card";
import LayoutGrid from "preact-material-components/LayoutGrid";

/** handles /profile and /profile/:user */
export const Profile1 = ({ user, ...props }) => {
	return (
		<section class="profile">
			<h2>Profile: {user || "you"}</h2>
			<p>This is some text about {user || "you"}.</p>
			<pre>{JSON.stringify({ user, ...props }, 0, "  ")}</pre>
		</section>
	);
};

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: { user: {} },
			waiting: true,
			edit: false,
			firstUse: false
		};
	}

	componentDidMount() {
		// console.log('Profile Props:',this.props)
		// window.app.current_user_profile_ref
	}

	render(props, state) {
		// const { waiting, profile, user } = state;
		const { edit } = state;

		let profile = {},
			app = {},
			user = {};
		if (this.props.userid && this.props.userid === "me") {
			profile = this.props.profile;
		} else {
			profile = this.state.profile;
		}

		console.log(profile);

		return (
			<div class="page-profile">
				<div
					className="header-profile"
					style={{
						backgroundImage: `url(${profile &&
						profile.backgroundImage
							? profile.backgroundImage
							: "https://preact-admin-mdl.surge.sh/assets/bg_WXYd_.png"})`
					}}
				/>
				<LayoutGrid>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="8">
							<Card className="dlx-card profile-card">
								<Card.HorizontalBlock>
									<div
										className="header-profile-image"
										style={{
											backgroundImage: `url(${profile.user &&
												profile.user.photoURL})`
										}}
									/>

									<Card.Primary>
										<Card.Title large>
											{profile.user &&
												profile.user.displayName}
										</Card.Title>
										<Card.Subtitle>
											{profile.user && profile.user.email}
										</Card.Subtitle>
									</Card.Primary>

									<h2 className="profile-card__rank">9</h2>

									<Card.MediaItem
										src="some-picture.jpg"
										x="1dot5"
									/>
								</Card.HorizontalBlock>

								<Card.HorizontalBlock />
							</Card>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}

export default Profile;

// background
// http://www.xsjjys.com/data/out/230/WHDQ-513656905.jpg
