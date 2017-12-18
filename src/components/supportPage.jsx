import { Component, render } from "preact";

// ========================================
// SupportPage
// ========================================

// import * as slack from "slack";

import { route } from "preact-router";

import Card from "preact-material-components/Card";
import LayoutGrid from "preact-material-components/LayoutGrid";
import List from "preact-material-components/List";
import Fab from "preact-material-components/Fab";
import Dialog from "preact-material-components/Dialog";
import Textfield from "preact-material-components/Textfield";
import Select from "preact-material-components/Select";
import Button from "preact-material-components/Button";

import DatePicker from "material-ui/DatePicker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
const DatePickerExampleSimple = () => (
  <DatePicker hintText="Landscape Dialog" container="inline" mode="landscape" />
);
const requestTypes = ["Schedule Change", "Time Off"];
const scheduleRequestTypes = [
  "Late",
  "Leave Early",
  "Schedule Change ( Permanent )",
  "Schedule Change ( Temporary )"
];

const requestStatus = ["Queue", "Revision", "Denied", "Accepted"];

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { newValid: false, newDates: [], chats: [] };
  }

  componentDidMount() {
    console.log("app.base Props:", window.app.base);
    // window.app.current_user_profile_ref

    const uid = "0";

    window.app.base.bindToState("chats", {
      context: this,
      state: "chats",
      asArray: true
    });

    this.newRequestDialog.MDComponent.show();

    // this.setState({ chats: chats });
  }

  createNewRequest_fetch() {
    var myHeaders = new Headers();

    var myInit = {
      method: "GET",
      headers: myHeaders,
      mode: "cors",
      cache: "default"
    };

    fetch(
      "https://slack.com/api/channels.create?token=xoxp-283145054819-283362751653-282621723136-4d89b6b7a3afd4fc960208c423988f6e",
      myInit
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      });
  }

  createNewRequest() {
    this.setState({ busy: true });

    var immediatelyAvailableReference = window.app.base
      .push("chat", {
        data: { title: this.state.newTitle, type: this.state.newType }
      })
      .then(newLocation => {
        // var generatedKey = newLocation.key;
        this.setState({ busy: false, newTitle: "", newType: "" });
      })
      .catch(err => {
        //handle error
      });
    //available immediately, you don't have to wait for the Promise to resolve
    var generatedKey = immediatelyAvailableReference.key;
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }


  handleChange = (event, date) => {
    console.log(date)
    this.setState({
      controlledDate: date,
    });
  };

  render(props, state) {
    const { chats } = state;
    // console.log("chats - ", chats);
    console.log("this.presel ", this.presel);

    return (
      <div class="page-profile">
        <LayoutGrid>
          <LayoutGrid.Inner>
            <h1>Requests</h1>

            <LayoutGrid.Cell cols="12">
              <Card className="dlx-card">
                <Card.HorizontalBlock>
                  <Card.Primary>
                    <Card.Title large>Title</Card.Title>
                    <Card.Subtitle>gfhfghgf</Card.Subtitle>
                  </Card.Primary>

                  <h2 className="profile-card__rank">9</h2>

                  <Card.MediaItem src="some-picture.jpg" x="1dot5" />
                </Card.HorizontalBlock>
              </Card>
            </LayoutGrid.Cell>

            <LayoutGrid.Cell cols="12">
              <Card className="dlx-card">
                <List>
                  {chats &&
                    chats.map((chatItem, key) => (
                      <List.Item
                        className={chatItem.active && "nav-active"}
                        onClick={() => {
                          route(`/support/${key}`);
                        }}
                        key={key}
                      >
                        <List.ItemIcon>account_circle</List.ItemIcon>
                        <List.TextContainer>
                          <List.PrimaryText
                          >{`${chatItem.title}`}</List.PrimaryText>
                          <List.SecondaryText>
                            {`${chatItem.subtitle}`}
                          </List.SecondaryText>
                        </List.TextContainer>
                      </List.Item>
                    ))}
                </List>
              </Card>
            </LayoutGrid.Cell>
          </LayoutGrid.Inner>
        </LayoutGrid>

        <Dialog
          ref={dialog => {
            this.newRequestDialog = dialog;
          }}
          className="newRequestDialog"
        >
          <Dialog.Header>{`${requestTypes[this.state.newTypeSelectedIndex] ||
            "New Request"}`}</Dialog.Header>
          <Dialog.Body>
            <form style={{ flexDirection: "column", display: "flex" }}>
              <Select
                hintText="Request Type"
                ref={presel => {
                  this.presel = presel;
                }}
                selectedIndex={this.state.newRequestType}
                onChange={e => {
                  this.setState({
                    newRequestType: e.selectedIndex
                  });
                  //selected option
                  console.log(e.selectedOption);
                }}
              >
                <Select.Item>Schedule</Select.Item>
                <Select.Item>Time Off</Select.Item>
              </Select>

              {this.state.newRequestType === 0 && (
                <div>
                <Select
                  hintText="Schedule Type"
                  ref={presel => {
                    this.presel = presel;
                  }}
                  selectedIndex={this.state.newTypeSelectedIndex}
                  onChange={e => {
                    this.setState({
                      newTypeSelectedIndex: e.selectedIndex
                    });
                    //selected option
                    console.log(e.selectedOption);
                  }}
                >
                  <Select.Item>Late</Select.Item>
                  <Select.Item>Leave Early</Select.Item>
                  <Select.Item>Schedule Change ( Permanent )</Select.Item>
                  <Select.Item>Schedule Change ( Temporary )</Select.Item>
                </Select>


                <MuiThemeProvider>
                  <DatePicker
                    hintText="Landscape Dialog"
                    container="inline"
                    mode="landscape"
                    onChange={this.handleChange}
                  />
                </MuiThemeProvider>

                </div>
              )}

              {this.state.newRequestType === 1 && (
                <div>
                  <Select
                    hintText="Time Off Request"
                    ref={presel => {
                      this.presel = presel;
                    }}
                    selectedIndex={this.state.newTimeoffTypeSelectedIndex}
                    onChange={e => {
                      this.setState({
                        newTimeoffTypeSelectedIndex: e.selectedIndex
                      });
                      //selected option
                      console.log(e.selectedOption);
                    }}
                  >
                    <Select.Item> BER</Select.Item>
                    <Select.Item> ETO</Select.Item>
                    <Select.Item> FMLA</Select.Item>
                    <Select.Item> LOA</Select.Item>
                    <Select.Item> Planned Personal</Select.Item>
                    <Select.Item> PTO</Select.Item>
                    <Select.Item> EPTO</Select.Item>
                    <Select.Item> VTO</Select.Item>
                  </Select>

                  <MuiThemeProvider>
                    <DatePicker
                      hintText="Landscape Dialog"
                      container="inline"
                      mode="landscape"
                    />
                  </MuiThemeProvider>
                </div>
              )}

              <Textfield
                label="Enter Time or N/A"
                value={this.state.newLateTime}
                onInput={e => this.setState({ newLateTime: e.target.value })}
              />
              <Textfield
                label="Enter Time or N/A"
                value={this.state.newLeaveTime}
                onInput={e => this.setState({ newLeaveTime: e.target.value })}
              />
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton
              accept={true}
              disabled={this.state.newValid}
              onClick={() => {
                this.createNewRequest();
              }}
            >
              okay
            </Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>

        <Fab
          exited={this.state.fabExited}
          ripple={true}
          onClick={() => {
            // console.log(this.newRequestDialog.MDComponent);
            this.newRequestDialog.MDComponent.show();
            this.presel.MDComponent.foundation_.resize();
          }}
          className="newRequest-fab"
          style={{
            position: "absolute",
            right: 20,
            bottom: 20
          }}
        >
          <Fab.Icon>note_add</Fab.Icon>
        </Fab>
      </div>
    );
  }
}

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  componentDidMount() {
    console.log("Details Props:", this.props);
    // window.app.current_user_profile_ref

    const { profile } = this.props;

    console.log("profile", profile);

    // app.base.bindToState("/chats", {
    // 	queries: {
    // 		orderByChild: "requestedUser",
    // 		equalTo: `${profile.uid}`
    // 	},
    // 	context: this,
    // 	state: "chats",
    // 	asArray: true
    // });

    // .then(data => {
    // 	console.log("chats: ", data);
    // })
    // .catch(error => {
    // 	//handle error
    // });

    // window.base
    // 	.fetch(`chats/${uid}`, {
    // 		context: this
    // 	})
    // 	.then(data => {
    // 		this.setState({
    // 			item: data
    // 		});
    // 	})
    // 	.catch(error => {
    // 		//handle error
    // 	});
  }

  render(props, state) {
    console.log(props.chatId);
    // const item = chats[`${props.chatId}`];
    const { item } = this.state;
    // const members = item.members ? item.members : [];
    const members = [];
    const { profile } = props;
    console.dir(profile && profile);

    if (!profile.user) {
      return <div>loading</div>;
    }

    return (
      <div class="page-profile">
        <LayoutGrid>
          <LayoutGrid.Inner>
            <LayoutGrid.Cell cols="8">
              <h2 className="section-header">{item.title}</h2>
              <div style={{ color: "grey" }}>{item.subtitle}</div>
            </LayoutGrid.Cell>

            <LayoutGrid.Cell cols="4">
              <div />
            </LayoutGrid.Cell>
            <LayoutGrid.Cell cols="12" mobile="12">
              <Card
                className="dlx-card"
                style={{
                  backgroundImage:
                    "url(https://preact-admin-mdl.surge.sh/assets/bg_WXYd_.png)"
                }}
              >
                <div>
                  <Card.Primary>
                    <Card.Title large>Members</Card.Title>

                    <List>
                      <List.Item
                        onClick={() => {
                          route(`/profile}`);
                        }}
                      >
                        <List.ItemIcon>account_circle</List.ItemIcon>

                        <List.TextContainer>
                          <List.PrimaryText>{`${profile &&
                            profile.user.displayName}`}</List.PrimaryText>

                          <List.SecondaryText>
                            {`Trip Crewbie`}
                          </List.SecondaryText>
                        </List.TextContainer>
                      </List.Item>

                      {members.length &&
                        members.map((member, key) => (
                          <List.Item
                            onClick={() => {
                              route(`/profile/${member.user.uid}`);
                            }}
                            key={key}
                          >
                            <List.ItemIcon>account_circle</List.ItemIcon>

                            <List.TextContainer>
                              <List.PrimaryText>{`${member.user
                                .displayName}`}</List.PrimaryText>

                              <List.SecondaryText>
                                {`${member.user.memberType}`}
                              </List.SecondaryText>
                            </List.TextContainer>
                          </List.Item>
                        ))}
                    </List>
                  </Card.Primary>
                </div>
              </Card>
            </LayoutGrid.Cell>
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}

export default { Root, Details };

// background
// http://www.xsjjys.com/data/out/230/WHDQ-513656905.jpg
// <Card.Subtitle>gfhfghgf</Card.Subtitle>
//style={{ backgroundColor: "var(--mdc-theme-primary)" }}
///
// Add dates
///

// {
//   this.state.newDates.map((date, key) => {
//     <DatePicker
//       label="Select Date"
//       sundayFirstDayOfWeek
//       onChange={(item, value) => {
//         var index = this.state.newDates.indexOf(key);

//         if (index !== -1) {
//           this.state.newDates[key] = value;
//         }
//         // this.setState({ ...this.state, newDates[key]: value });
//         // this.dateChange()
//       }}
//     />;
//   })
// }

// <Button>
//   Add date
//               </Button>
