using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InventoryManagementApi.Migrations
{
    public partial class mig_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "inv_data_source",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConnectionLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    UserAccesId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AcessToken = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_data_source", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "inv_field_data",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DataReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_field_data", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "inv_inventory_type",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_inventory_type", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "inv_role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "inv_schedule",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_schedule", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "inv_user",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EncryptedPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_user", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_user_inv_role_Role_Id",
                        column: x => x.Role_Id,
                        principalTable: "inv_role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "inv_process",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    State = table.Column<int>(type: "int", nullable: false),
                    IsFavorite = table.Column<bool>(type: "bit", nullable: false),
                    IsArchived = table.Column<bool>(type: "bit", nullable: false),
                    InventoryType_Id = table.Column<int>(type: "int", nullable: true),
                    Schedule_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Data_Source_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_process", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_process_inv_data_source_Data_Source_Id",
                        column: x => x.Data_Source_Id,
                        principalTable: "inv_data_source",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_inv_process_inv_inventory_type_InventoryType_Id",
                        column: x => x.InventoryType_Id,
                        principalTable: "inv_inventory_type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_inv_process_inv_schedule_Schedule_Id",
                        column: x => x.Schedule_Id,
                        principalTable: "inv_schedule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "inv_step",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Next_Step_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Previous_Step_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Process_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_step", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_step_inv_process_Process_Id",
                        column: x => x.Process_Id,
                        principalTable: "inv_process",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inv_step_inv_step_Next_Step_Id",
                        column: x => x.Next_Step_Id,
                        principalTable: "inv_step",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_inv_step_inv_step_Previous_Step_Id",
                        column: x => x.Previous_Step_Id,
                        principalTable: "inv_step",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProcessDataModelUserDataModel",
                columns: table => new
                {
                    InventoryProcessesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessDataModelUserDataModel", x => new { x.InventoryProcessesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ProcessDataModelUserDataModel_inv_process_InventoryProcessesId",
                        column: x => x.InventoryProcessesId,
                        principalTable: "inv_process",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcessDataModelUserDataModel_inv_user_UsersId",
                        column: x => x.UsersId,
                        principalTable: "inv_user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_field",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Label = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Position = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    Data_Source_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Field_Data_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Step_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_field", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_field_inv_data_source_Data_Source_Id",
                        column: x => x.Data_Source_Id,
                        principalTable: "inv_data_source",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_inv_field_inv_field_data_Field_Data_Id",
                        column: x => x.Field_Data_Id,
                        principalTable: "inv_field_data",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_inv_field_inv_step_Step_Id",
                        column: x => x.Step_Id,
                        principalTable: "inv_step",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_input_field",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRequired = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_input_field", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_input_field_inv_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_output_field",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_output_field", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_output_field_inv_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_choice_button",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_choice_button", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_choice_button_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_date_input",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaxDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MinDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_date_input", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_date_input_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_dropdown",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsMultiselect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_dropdown", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_dropdown_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_file_input",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Extension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinSize = table.Column<int>(type: "int", nullable: false),
                    MaxSize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_file_input", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_file_input_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_slider",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Min = table.Column<int>(type: "int", nullable: false),
                    Max = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_slider", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_slider_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_text_input",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Max = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Min = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Placeholder = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValidationRegex = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_text_input", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_text_input_inv_input_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_input_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_file_output",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Extension = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_file_output", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_file_output_inv_output_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_output_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_link",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_link", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_link_inv_output_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_output_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_text_output",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_text_output", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_text_output_inv_output_field_Id",
                        column: x => x.Id,
                        principalTable: "inv_output_field",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "inv_option",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: true),
                    referenceId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceButton_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Dropdown_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inv_option", x => x.Id);
                    table.ForeignKey(
                        name: "FK_inv_option_inv_choice_button_ChoiceButton_Id",
                        column: x => x.ChoiceButton_Id,
                        principalTable: "inv_choice_button",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_inv_option_inv_dropdown_Dropdown_Id",
                        column: x => x.Dropdown_Id,
                        principalTable: "inv_dropdown",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_inv_field_Data_Source_Id",
                table: "inv_field",
                column: "Data_Source_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_field_Field_Data_Id",
                table: "inv_field",
                column: "Field_Data_Id",
                unique: true,
                filter: "[Field_Data_Id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_inv_field_Step_Id",
                table: "inv_field",
                column: "Step_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_option_ChoiceButton_Id",
                table: "inv_option",
                column: "ChoiceButton_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_option_Dropdown_Id",
                table: "inv_option",
                column: "Dropdown_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_process_Data_Source_Id",
                table: "inv_process",
                column: "Data_Source_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_process_InventoryType_Id",
                table: "inv_process",
                column: "InventoryType_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_process_Schedule_Id",
                table: "inv_process",
                column: "Schedule_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_step_Next_Step_Id",
                table: "inv_step",
                column: "Next_Step_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_step_Previous_Step_Id",
                table: "inv_step",
                column: "Previous_Step_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_step_Process_Id",
                table: "inv_step",
                column: "Process_Id");

            migrationBuilder.CreateIndex(
                name: "IX_inv_user_Role_Id",
                table: "inv_user",
                column: "Role_Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessDataModelUserDataModel_UsersId",
                table: "ProcessDataModelUserDataModel",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "inv_date_input");

            migrationBuilder.DropTable(
                name: "inv_file_input");

            migrationBuilder.DropTable(
                name: "inv_file_output");

            migrationBuilder.DropTable(
                name: "inv_link");

            migrationBuilder.DropTable(
                name: "inv_option");

            migrationBuilder.DropTable(
                name: "inv_slider");

            migrationBuilder.DropTable(
                name: "inv_text_input");

            migrationBuilder.DropTable(
                name: "inv_text_output");

            migrationBuilder.DropTable(
                name: "ProcessDataModelUserDataModel");

            migrationBuilder.DropTable(
                name: "inv_choice_button");

            migrationBuilder.DropTable(
                name: "inv_dropdown");

            migrationBuilder.DropTable(
                name: "inv_output_field");

            migrationBuilder.DropTable(
                name: "inv_user");

            migrationBuilder.DropTable(
                name: "inv_input_field");

            migrationBuilder.DropTable(
                name: "inv_role");

            migrationBuilder.DropTable(
                name: "inv_field");

            migrationBuilder.DropTable(
                name: "inv_field_data");

            migrationBuilder.DropTable(
                name: "inv_step");

            migrationBuilder.DropTable(
                name: "inv_process");

            migrationBuilder.DropTable(
                name: "inv_data_source");

            migrationBuilder.DropTable(
                name: "inv_inventory_type");

            migrationBuilder.DropTable(
                name: "inv_schedule");
        }
    }
}
