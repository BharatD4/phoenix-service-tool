using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;
using System.IO.Ports;
using System.Diagnostics;
using System.Net;
using System.IO;
using System.Text;

namespace PhoenixServiceTool
{
    // ==========================================
    // 1. LOGIN & REGISTER FORM (Matches Image 1)
    // ==========================================
    public class RegisterLoginForm : Form
    {
        private TextBox txtUsername;
        private TextBox txtEmail;
        private TextBox txtPassword;
        private Button btnLogin;
        private Button btnRegister;
        private Label lblStatus;
        private GroupBox grpRegister;
        private bool isRegisterMode = true;

        public string LoggedInUser { get; private set; }
        public double UserCredits { get; private set; }

        public RegisterLoginForm()
        {
            LoggedInUser = "SHRESHTHMOBILE";
            UserCredits = 5.48;

            this.Text = "Phoenix Service Tool - Register";
            this.Size = new Size(580, 560);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(18, 18, 20);
            this.ForeColor = Color.White;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;

            // Top Header: PHOENIX SERVICE TOOL
            Panel pnlHeader = new Panel()
            {
                Location = new Point(0, 15),
                Size = new Size(560, 60),
                BackColor = Color.Transparent
            };

            Label lblPhoenix = new Label()
            {
                Text = "PHOENIX",
                Font = new Font("Segoe UI", 18, FontStyle.Bold),
                ForeColor = Color.White,
                Location = new Point(110, 10),
                AutoSize = true
            };

            Label lblService = new Label()
            {
                Text = "SERVICE",
                Font = new Font("Segoe UI", 18, FontStyle.Bold),
                ForeColor = Color.FromArgb(250, 204, 21), // Yellow
                Location = new Point(230, 10),
                AutoSize = true
            };

            Label lblTool = new Label()
            {
                Text = "TOOL",
                Font = new Font("Segoe UI", 18, FontStyle.Bold),
                ForeColor = Color.FromArgb(239, 68, 68), // Red
                Location = new Point(345, 10),
                AutoSize = true
            };

            pnlHeader.Controls.Add(lblPhoenix);
            pnlHeader.Controls.Add(lblService);
            pnlHeader.Controls.Add(lblTool);
            this.Controls.Add(pnlHeader);

            // GroupBox "Register"
            grpRegister = new GroupBox()
            {
                Text = "Register",
                Font = new Font("Segoe UI", 10, FontStyle.Regular),
                ForeColor = Color.FromArgb(148, 163, 184),
                Location = new Point(30, 80),
                Size = new Size(505, 380),
                BackColor = Color.FromArgb(22, 22, 26)
            };

            // Field 1: UserName
            Label lblUser = new Label()
            {
                Text = "UserName",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248), // Cyan / Sky Blue
                Location = new Point(25, 45),
                Size = new Size(130, 30)
            };

            txtUsername = new TextBox()
            {
                Location = new Point(165, 42),
                Size = new Size(310, 32),
                Font = new Font("Segoe UI", 11),
                BackColor = Color.FromArgb(30, 32, 38),
                ForeColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle,
                Text = "VIKASH KI DUNIYA 2026"
            };

            // Field 2: Email Address
            Label lblEmail = new Label()
            {
                Text = "Email Address",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.FromArgb(250, 204, 21), // Yellow
                Location = new Point(25, 105),
                Size = new Size(130, 30)
            };

            txtEmail = new TextBox()
            {
                Location = new Point(165, 102),
                Size = new Size(310, 32),
                Font = new Font("Segoe UI", 11),
                BackColor = Color.FromArgb(30, 32, 38),
                ForeColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle,
                Text = "VIKASHKIDUNIYA@GMAIL.COM"
            };

            // Field 3: Password
            Label lblPass = new Label()
            {
                Text = "Password",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248),
                Location = new Point(25, 165),
                Size = new Size(130, 30)
            };

            txtPassword = new TextBox()
            {
                Location = new Point(165, 162),
                Size = new Size(310, 32),
                Font = new Font("Segoe UI", 11),
                BackColor = Color.FromArgb(30, 32, 38),
                ForeColor = Color.White,
                BorderStyle = BorderStyle.FixedSingle,
                PasswordChar = '●',
                Text = "123456"
            };

            grpRegister.Controls.Add(lblUser);
            grpRegister.Controls.Add(txtUsername);
            grpRegister.Controls.Add(lblEmail);
            grpRegister.Controls.Add(txtEmail);
            grpRegister.Controls.Add(lblPass);
            grpRegister.Controls.Add(txtPassword);

            // Bottom Buttons inside GroupBox (Login / Register)
            btnLogin = new Button()
            {
                Text = "   Login",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(35, 38, 46),
                FlatStyle = FlatStyle.Flat,
                Location = new Point(100, 240),
                Size = new Size(140, 48),
                Cursor = Cursors.Hand
            };
            btnLogin.FlatAppearance.BorderColor = Color.FromArgb(168, 85, 247); // Neon Purple
            btnLogin.FlatAppearance.BorderSize = 1;
            btnLogin.Click += BtnLogin_Click;

            btnRegister = new Button()
            {
                Text = "   Register",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(35, 38, 46),
                FlatStyle = FlatStyle.Flat,
                Location = new Point(265, 240),
                Size = new Size(140, 48),
                Cursor = Cursors.Hand
            };
            btnRegister.FlatAppearance.BorderColor = Color.FromArgb(168, 85, 247); // Neon Purple
            btnRegister.FlatAppearance.BorderSize = 1;
            btnRegister.Click += BtnRegister_Click;

            grpRegister.Controls.Add(btnLogin);
            grpRegister.Controls.Add(btnRegister);
            this.Controls.Add(grpRegister);

            // Bottom status label (Green text as shown in screenshot)
            lblStatus = new Label()
            {
                Text = "User registered successfully.",
                Font = new Font("Segoe UI", 10, FontStyle.Bold),
                ForeColor = Color.FromArgb(34, 197, 94), // Bright Green
                Location = new Point(32, 475),
                Size = new Size(500, 30),
                AutoSize = false
            };
            this.Controls.Add(lblStatus);
        }

        private void BtnRegister_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtUsername.Text))
            {
                lblStatus.ForeColor = Color.Red;
                lblStatus.Text = "Please enter a valid UserName.";
                return;
            }

            lblStatus.ForeColor = Color.FromArgb(34, 197, 94);
            lblStatus.Text = "User registered successfully. Launching Tool...";
            LoggedInUser = txtUsername.Text.Trim();
            UserCredits = 25.00; // New registration welcome credits

            Timer t = new Timer();
            t.Interval = 1000;
            t.Tick += (s, ev) =>
            {
                t.Stop();
                this.DialogResult = DialogResult.OK;
                this.Close();
            };
            t.Start();
        }

        private void BtnLogin_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtUsername.Text))
            {
                lblStatus.ForeColor = Color.Red;
                lblStatus.Text = "Please enter your UserName to Login.";
                return;
            }

            lblStatus.ForeColor = Color.FromArgb(34, 197, 94);
            lblStatus.Text = "Login successful. Initializing Phoenix Engine...";
            LoggedInUser = txtUsername.Text.Trim();
            UserCredits = 5.48; // Existing balance as per user's screenshot

            Timer t = new Timer();
            t.Interval = 1000;
            t.Tick += (s, ev) =>
            {
                t.Stop();
                this.DialogResult = DialogResult.OK;
                this.Close();
            };
            t.Start();
        }
    }

    // ===============================================
    // 2. MAIN TOOL WINDOW (Matches Image 2 Version 8.2.3)
    // ===============================================
    public class MainToolForm : Form
    {
        private string currentUser;
        private double userCredits;

        private ComboBox cmbUsbInterface;
        private CheckBox chkAuto;
        private Button btnRefreshPorts;

        private TextBox txtLeftTerminal;
        private ListBox lstFunctions;

        private ComboBox cmbModel;
        private TextBox txtLoaderDa;
        private Button btnBrowseDa;
        private RadioButton rdoMem;
        private RadioButton rdoUfs;

        private Button btnReadInfo;
        private Button btnFastbootToEdl;
        private Button btnBootloaderUnlock;

        private ProgressBar prgBottom;
        private Label lblBottomUser;
        private Label lblBottomCredit;
        private Label lblBottomPct;

        public MainToolForm(string username, double credits)
        {
            this.currentUser = string.IsNullOrEmpty(username) ? "SHRESHTHMOBILE" : username;
            this.userCredits = credits > 0 ? credits : 5.48;

            this.Text = "Phoenix Service Tool [ Version 8.2.3 ]";
            this.Size = new Size(1060, 680);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(16, 18, 24);
            this.ForeColor = Color.White;
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;

            InitializeTopBar();
            InitializeLeftPane();
            InitializeRightPane();
            InitializeBottomBar();
        }

        private void InitializeTopBar()
        {
            // USB Group (Left top)
            GroupBox grpUsb = new GroupBox()
            {
                Text = "USB",
                Font = new Font("Segoe UI", 9, FontStyle.Regular),
                ForeColor = Color.FromArgb(148, 163, 184),
                Location = new Point(15, 10),
                Size = new Size(420, 75),
                BackColor = Color.FromArgb(20, 22, 28)
            };

            cmbUsbInterface = new ComboBox()
            {
                Location = new Point(12, 28),
                Size = new Size(295, 26),
                Font = new Font("Consolas", 8.5f),
                BackColor = Color.FromArgb(30, 32, 40),
                ForeColor = Color.FromArgb(56, 189, 248),
                DropDownStyle = ComboBoxStyle.DropDownList
            };

            // Detect real or simulated interface
            string[] ports = SerialPort.GetPortNames();
            if (ports.Length > 0)
            {
                foreach (string p in ports)
                    cmbUsbInterface.Items.Add("Android Interface ( " + p + " / Qualcomm 9008 )");
            }
            cmbUsbInterface.Items.Add("Android Interface ( 9b01005930533036340033dc58422c )");
            cmbUsbInterface.SelectedIndex = 0;

            chkAuto = new CheckBox()
            {
                Text = "Auto",
                Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(34, 197, 94),
                Location = new Point(315, 29),
                Size = new Size(55, 24),
                Checked = true
            };

            btnRefreshPorts = new Button()
            {
                Text = "🔍",
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                Location = new Point(375, 26),
                Size = new Size(32, 28),
                BackColor = Color.FromArgb(40, 44, 56),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat
            };
            btnRefreshPorts.Click += (s, e) =>
            {
                string[] p = SerialPort.GetPortNames();
                cmbUsbInterface.Items.Clear();
                if (p.Length > 0)
                {
                    foreach (string port in p)
                        cmbUsbInterface.Items.Add("Android Interface ( " + port + " / Detected )");
                }
                cmbUsbInterface.Items.Add("Android Interface ( 9b01005930533036340033dc58422c )");
                cmbUsbInterface.SelectedIndex = 0;
                AppendLog("USB Subsystem rescanned. Ports found: " + p.Length);
            };

            grpUsb.Controls.Add(cmbUsbInterface);
            grpUsb.Controls.Add(chkAuto);
            grpUsb.Controls.Add(btnRefreshPorts);
            this.Controls.Add(grpUsb);

            // Brand Navigation Tabs (Top right)
            string[] brands = new string[] { "HMD", "SAMSUNG", "OPLUS", "XIAOMI", "HONOR", "TRANSSION", "History", "Account" };
            int tabX = 450;
            for (int i = 0; i < brands.Length; i++)
            {
                string brandName = brands[i];
                Button btnBrand = new Button()
                {
                    Text = brandName,
                    Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                    Location = new Point(tabX + (i * 72), 22),
                    Size = new Size(68, 55),
                    BackColor = (brandName == "XIAOMI") ? Color.FromArgb(30, 58, 138) : Color.FromArgb(24, 26, 34),
                    ForeColor = (brandName == "XIAOMI") ? Color.FromArgb(56, 189, 248) : Color.White,
                    FlatStyle = FlatStyle.Flat,
                    Cursor = Cursors.Hand
                };
                btnBrand.FlatAppearance.BorderColor = (brandName == "XIAOMI") ? Color.FromArgb(56, 189, 248) : Color.FromArgb(50, 54, 66);
                btnBrand.Click += (s, e) =>
                {
                    AppendLog("Selected Brand Platform: " + brandName);
                };
                this.Controls.Add(btnBrand);
            }
        }

        private void InitializeLeftPane()
        {
            // Left Pane (Function header, user info, server table)
            Panel pnlLeft = new Panel()
            {
                Location = new Point(15, 95),
                Size = new Size(420, 500),
                BackColor = Color.FromArgb(10, 11, 14),
                BorderStyle = BorderStyle.FixedSingle
            };

            Label lblFunction = new Label()
            {
                Text = "FUNCTION : XIAOMI BOOTLOADER UNLOCK",
                Font = new Font("Segoe UI", 9.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(34, 197, 94), // Green
                Location = new Point(10, 10),
                Size = new Size(400, 22)
            };
            pnlLeft.Controls.Add(lblFunction);

            txtLeftTerminal = new TextBox()
            {
                Multiline = true,
                ReadOnly = true,
                BackColor = Color.FromArgb(10, 11, 14),
                ForeColor = Color.FromArgb(203, 213, 225),
                Font = new Font("Consolas", 8.5f),
                Location = new Point(10, 35),
                Size = new Size(400, 105),
                BorderStyle = BorderStyle.None,
                Text = "Loading User Information...OK\r\n" +
                       "Username        : " + currentUser + "\r\n" +
                       "Credit          : " + userCredits.ToString("0.00") + "\r\n\r\n" +
                       "Loading Server Information...OK\r\n"
            };
            pnlLeft.Controls.Add(txtLeftTerminal);

            // Server Functions List with Credits and Status
            lstFunctions = new ListBox()
            {
                Location = new Point(10, 145),
                Size = new Size(400, 345),
                BackColor = Color.FromArgb(10, 11, 14),
                ForeColor = Color.FromArgb(250, 204, 21), // Amber / Gold
                Font = new Font("Consolas", 8.5f),
                BorderStyle = BorderStyle.None,
                ItemHeight = 22
            };

            string[] serverFunctions = new string[]
            {
                "GUATEMALA MI ACC UNLOCK      Credit: 10     ONLINE",
                "OPLUS DEMO REMOVE            Credit: 1      ONLINE",
                "OPLUS SECRECY DECRYPT        Credit: 0      FREE",
                "REALME SALES SUPPORT         Credit: 5      ONLINE",
                "TRANSSION ANTI CRACK         Credit: 10     ONLINE",
                "TRANSSION AUTH               Credit: 2      ONLINE",
                "XIAOMI ASSISTANT FRP         Credit: 3      ONLINE",
                "XIAOMI FASTBOT TO EDL        Credit: 0.5    ONLINE",
                "XIAOMI INDIA UBL UNLOCK      Credit: 1      ONLINE",
                "XIAOMI MTK V5 AUTH           Credit: 5      ONLINE",
                "XIAOMI MTK V6 AUTH           Credit: 5      ONLINE",
                "XIAOMI PREMIUM CHECKER       Credit: 0.25   ONLINE",
                "XIAOMI QC AUTH FLASH         Credit: 5      ONLINE"
            };

            foreach (string sf in serverFunctions)
            {
                lstFunctions.Items.Add(sf);
            }
            lstFunctions.SelectedIndex = 9; // Highlight "XIAOMI MTK V5 AUTH" as in screenshot

            pnlLeft.Controls.Add(lstFunctions);
            this.Controls.Add(pnlLeft);
        }

        private void InitializeRightPane()
        {
            // Right Pane Setting Group
            GroupBox grpSetting = new GroupBox()
            {
                Text = "Setting",
                Font = new Font("Segoe UI", 9, FontStyle.Regular),
                ForeColor = Color.FromArgb(148, 163, 184),
                Location = new Point(450, 95),
                Size = new Size(580, 500),
                BackColor = Color.FromArgb(20, 22, 28)
            };

            // Model
            Label lblModel = new Label()
            {
                Text = "Model",
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                ForeColor = Color.FromArgb(217, 70, 239), // Pink / Fuchsia
                Location = new Point(20, 30),
                Size = new Size(60, 25)
            };

            cmbModel = new ComboBox()
            {
                Location = new Point(100, 28),
                Size = new Size(450, 26),
                Font = new Font("Consolas", 9),
                BackColor = Color.FromArgb(30, 32, 40),
                ForeColor = Color.White,
                DropDownStyle = ComboBoxStyle.DropDownList
            };
            cmbModel.Items.Add("# Auto Model (Automatic Detection)");
            cmbModel.Items.Add("Xiaomi Redmi Note 13 Pro 5G (garnet)");
            cmbModel.Items.Add("Xiaomi 14 / 14 Pro (houji/shennong)");
            cmbModel.Items.Add("Samsung Galaxy S24 Ultra (SM-S928B)");
            cmbModel.Items.Add("Samsung Galaxy A54 5G (SM-A546E)");
            cmbModel.Items.Add("Oppo Reno 11 Pro 5G (CPH2607)");
            cmbModel.SelectedIndex = 0;

            // Loader / DA
            Label lblLoader = new Label()
            {
                Text = "Loader / DA",
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                ForeColor = Color.FromArgb(34, 197, 94), // Green
                Location = new Point(20, 68),
                Size = new Size(80, 25)
            };

            txtLoaderDa = new TextBox()
            {
                Location = new Point(100, 66),
                Size = new Size(260, 25),
                Font = new Font("Consolas", 8.5f),
                BackColor = Color.FromArgb(30, 32, 40),
                ForeColor = Color.White,
                ReadOnly = true,
                Text = "Default_Auth_DA_v8.2.3.bin"
            };

            btnBrowseDa = new Button()
            {
                Text = "...",
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                Location = new Point(365, 65),
                Size = new Size(35, 26),
                BackColor = Color.FromArgb(40, 44, 56),
                ForeColor = Color.White,
                FlatStyle = FlatStyle.Flat
            };

            rdoMem = new RadioButton()
            {
                Text = "MEM",
                Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248),
                Location = new Point(415, 67),
                Size = new Size(60, 24),
                Checked = true
            };

            rdoUfs = new RadioButton()
            {
                Text = "UFS",
                Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248),
                Location = new Point(480, 67),
                Size = new Size(60, 24)
            };

            grpSetting.Controls.Add(lblModel);
            grpSetting.Controls.Add(cmbModel);
            grpSetting.Controls.Add(lblLoader);
            grpSetting.Controls.Add(txtLoaderDa);
            grpSetting.Controls.Add(btnBrowseDa);
            grpSetting.Controls.Add(rdoMem);
            grpSetting.Controls.Add(rdoUfs);

            // Sub tabs: Flash, Service, Fastboot, Mi Assistant, EFS, Utility
            string[] subTabs = new string[] { "Flash", "Service", "Fastboot", "Mi Assistant", "EFS", "Utility" };
            int subX = 20;
            for (int j = 0; j < subTabs.Length; j++)
            {
                string sName = subTabs[j];
                Button btnSub = new Button()
                {
                    Text = sName,
                    Font = new Font("Segoe UI", 8.5f, FontStyle.Bold),
                    Location = new Point(subX + (j * 88), 115),
                    Size = new Size(84, 30),
                    BackColor = (sName == "Fastboot") ? Color.FromArgb(30, 58, 138) : Color.FromArgb(28, 30, 38),
                    ForeColor = (sName == "Fastboot") ? Color.FromArgb(56, 189, 248) : Color.White,
                    FlatStyle = FlatStyle.Flat,
                    Cursor = Cursors.Hand
                };
                btnSub.FlatAppearance.BorderColor = Color.FromArgb(50, 54, 66);
                grpSetting.Controls.Add(btnSub);
            }

            // Big Action Buttons (Matching Screenshot)
            // 1. Read Info [ Fastboot Mode ]
            btnReadInfo = new Button()
            {
                Text = "ℹ   Read Info [ Fastboot Mode ]",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(28, 30, 38),
                FlatStyle = FlatStyle.Flat,
                Location = new Point(140, 185),
                Size = new Size(320, 56),
                Cursor = Cursors.Hand
            };
            btnReadInfo.FlatAppearance.BorderColor = Color.FromArgb(168, 85, 247);
            btnReadInfo.FlatAppearance.BorderSize = 1;
            btnReadInfo.Click += (s, e) => ExecuteAction("Read Info [ Fastboot Mode ]", 0);

            // 2. Fastboot To EDL
            btnFastbootToEdl = new Button()
            {
                Text = "🔄   Fastboot To EDL",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(28, 30, 38),
                FlatStyle = FlatStyle.Flat,
                Location = new Point(140, 260),
                Size = new Size(320, 56),
                Cursor = Cursors.Hand
            };
            btnFastbootToEdl.FlatAppearance.BorderColor = Color.FromArgb(168, 85, 247);
            btnFastbootToEdl.FlatAppearance.BorderSize = 1;
            btnFastbootToEdl.Click += (s, e) => ExecuteAction("Fastboot To EDL", 0.5);

            // 3. Bootloader Unlock [ Fastboot Mode ]
            btnBootloaderUnlock = new Button()
            {
                Text = "🔒   Bootloader Unlock [ Fastboot Mode ]",
                Font = new Font("Segoe UI", 11, FontStyle.Bold),
                ForeColor = Color.White,
                BackColor = Color.FromArgb(28, 30, 38),
                FlatStyle = FlatStyle.Flat,
                Location = new Point(140, 335),
                Size = new Size(320, 56),
                Cursor = Cursors.Hand
            };
            btnBootloaderUnlock.FlatAppearance.BorderColor = Color.FromArgb(168, 85, 247);
            btnBootloaderUnlock.FlatAppearance.BorderSize = 1;
            btnBootloaderUnlock.Click += (s, e) => ExecuteAction("Bootloader Unlock", 1.0);

            grpSetting.Controls.Add(btnReadInfo);
            grpSetting.Controls.Add(btnFastbootToEdl);
            grpSetting.Controls.Add(btnBootloaderUnlock);

            this.Controls.Add(grpSetting);
        }

        private void InitializeBottomBar()
        {
            // Bottom Bar: Progress 100% | User Name : SHRESHTHMOBILE | Credit : 5.48
            prgBottom = new ProgressBar()
            {
                Location = new Point(15, 608),
                Size = new Size(350, 18),
                Minimum = 0,
                Maximum = 100,
                Value = 100
            };
            this.Controls.Add(prgBottom);

            lblBottomPct = new Label()
            {
                Text = "100%",
                Font = new Font("Consolas", 8.5f, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248),
                Location = new Point(372, 609),
                Size = new Size(50, 20)
            };
            this.Controls.Add(lblBottomPct);

            lblBottomUser = new Label()
            {
                Text = "User Name : " + currentUser,
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                ForeColor = Color.White,
                Location = new Point(440, 608),
                Size = new Size(300, 20)
            };
            this.Controls.Add(lblBottomUser);

            lblBottomCredit = new Label()
            {
                Text = "Credit : " + userCredits.ToString("0.00"),
                Font = new Font("Segoe UI", 9, FontStyle.Bold),
                ForeColor = Color.FromArgb(56, 189, 248),
                Location = new Point(880, 608),
                Size = new Size(150, 20),
                TextAlign = ContentAlignment.TopRight
            };
            this.Controls.Add(lblBottomCredit);
        }

        private void AppendLog(string text)
        {
            txtLeftTerminal.AppendText(text + "\r\n");
        }

        private void ExecuteAction(string actionName, double creditCost)
        {
            AppendLog("\r\n[ACTION] Starting: " + actionName + "...");
            AppendLog("[PORT] Querying Android Fastboot interface...");

            Timer opTimer = new Timer();
            opTimer.Interval = 400;
            int step = 0;

            opTimer.Tick += (s, e) =>
            {
                step++;
                if (step == 1)
                {
                    AppendLog("[INFO] Handshake verified. Fastboot version 0.5.");
                }
                else if (step == 2)
                {
                    AppendLog("[SERVER] Authorizing with Cloud Server... Balance: " + userCredits.ToString("0.00"));
                }
                else if (step == 3)
                {
                    if (creditCost > 0)
                    {
                        userCredits -= creditCost;
                        lblBottomCredit.Text = "Credit : " + userCredits.ToString("0.00");
                        AppendLog("[CREDIT] Deducted " + creditCost.ToString("0.0") + " credits. New balance: " + userCredits.ToString("0.00"));
                    }
                    AppendLog("[SUCCESS] " + actionName + " executed successfully!");
                    opTimer.Stop();
                }
            };
            opTimer.Start();
        }
    }

    // ===============================================
    // ENTRY POINT
    // ===============================================
    public static class Program
    {
        [STAThread]
        public static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            // Step 1: Open Register / Login window (Image 1)
            using (RegisterLoginForm loginForm = new RegisterLoginForm())
            {
                if (loginForm.ShowDialog() == DialogResult.OK)
                {
                    // Step 2: Open Main Tool v8.2.3 (Image 2)
                    Application.Run(new MainToolForm(loginForm.LoggedInUser, loginForm.UserCredits));
                }
            }
        }
    }
}
