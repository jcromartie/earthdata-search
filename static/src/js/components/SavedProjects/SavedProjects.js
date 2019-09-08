import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, OverlayTrigger, Popover } from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import { parse } from 'qs'

import PortalLinkContainer from '../../containers/PortalLinkContainer/PortalLinkContainer'
import pluralize from '../../util/pluralize'
import Button from '../Button/Button'
import { getEarthdataConfig } from '../../../../../sharedUtils/config'
import cmrEnv from '../../../../../sharedUtils/cmrEnv'

import './SavedProjects.scss'

export class SavedProjects extends Component {
  constructor() {
    super()

    this.handleDeleteSavedProject = this.handleDeleteSavedProject.bind(this)
  }

  /**
   * Returns the URL for a project
   * @param {*} path Path field saved in the project
   * @param {*} id The project Id
   */
  projectTo(path, id) {
    const [pathname] = path.split('?')
    return `${pathname}?projectId=${id}`
  }

  /**
   * Determines the number of collections saved in the project path
   * @param {*} path Project path
   */
  projectContents(path) {
    const search = path.split('?')[1]
    const { p = '' } = parse(search)

    // Subtract 1 for the focusedCollection
    const count = p.split('!').length - 1

    return `${count} ${pluralize('Collection', count)}`
  }

  handleDeleteSavedProject(projectId) {
    const { onDeleteSavedProject } = this.props
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to remove this project? This action cannot be undone.')) {
      onDeleteSavedProject(projectId)
    }
  }

  render() {
    const { savedProjects } = this.props

    const { edscHost } = getEarthdataConfig(cmrEnv())

    return (
      <>
        <h2 className="route-wrapper__page-heading">
          <i className="fa fa-folder-o" />
          {' '}
          Saved Projects
        </h2>
        {
          savedProjects.length > 0 ? (
            <Table className="saved-projects-table" striped variant="dark">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Contents</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  savedProjects.map((project) => {
                    const {
                      created_at: createdAt,
                      id,
                      name,
                      path
                    } = project

                    const projectName = !name ? 'Untitled Project' : name

                    const [pathname] = path.split('?')
                    const sharePath = `${edscHost}${pathname}?projectId=${id}`

                    return (
                      <tr key={id}>
                        <td>
                          <PortalLinkContainer
                            to={this.projectTo(path, id)}
                          >
                            {projectName}
                          </PortalLinkContainer>
                        </td>
                        <td>
                          {this.projectContents(path)}
                        </td>
                        <td className="saved-projects-table__ago">
                          <TimeAgo date={createdAt} />
                        </td>
                        <td>
                          <div>
                            <OverlayTrigger
                              trigger="click"
                              placement="top"
                              overlay={(
                                <Popover
                                  id={`popover-basic-${id}`}
                                  className="share-popover"
                                >
                                  <Popover.Title>
                                    Share Project
                                  </Popover.Title>
                                  <Popover.Content>
                                    <p>
                                      Share your project by copying the URL
                                      below and sending it to others.
                                    </p>
                                    <p>
                                      <input
                                        type="text"
                                        readOnly
                                        value={sharePath}
                                      />
                                    </p>
                                  </Popover.Content>
                                </Popover>
                              )}
                            >
                              <Button
                                type="button"
                                label="Share project"
                                bootstrapVariant="light"
                              >
                                <i className="fa fa-share-square-o" />
                              </Button>
                            </OverlayTrigger>
                            <Button
                              type="button"
                              className="saved-projects__button saved-projects__button--remove"
                              label="Remove project"
                              bootstrapVariant="light"
                              onClick={() => this.handleDeleteSavedProject(id)}
                            >
                              <i className="fa fa-times-circle" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          ) : (
            <p>No saved projects to display.</p>
          )
        }
      </>
    )
  }
}

SavedProjects.defaultProps = {
  savedProjects: []
}

SavedProjects.propTypes = {
  savedProjects: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  onDeleteSavedProject: PropTypes.func.isRequired
}

export default SavedProjects